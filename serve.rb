require "socket"
dir = File.dirname(File.expand_path(__FILE__))
port = (ARGV[0] || 8080).to_i
server = TCPServer.new("0.0.0.0", port)
$stdout.puts "Serving #{dir} on http://localhost:#{port}"
$stdout.flush
loop do
  Thread.new(server.accept) do |client|
    begin
      request = client.gets
      if request
        method, raw_path = request.split(" ")
        path = raw_path.to_s.split("?").first
        path = "/index.html" if path == "/"
        filepath = File.join(dir, path)
        if File.exist?(filepath) && !File.directory?(filepath)
          body = File.binread(filepath)
          ext = File.extname(filepath)
          ct = case ext
          when ".html" then "text/html; charset=utf-8"
          when ".js"   then "application/javascript; charset=utf-8"
          when ".css"  then "text/css; charset=utf-8"
          when ".json" then "application/json; charset=utf-8"
          when ".png"  then "image/png"
          when ".jpg", ".jpeg" then "image/jpeg"
          when ".svg"  then "image/svg+xml"
          else "application/octet-stream"
          end
          client.print "HTTP/1.1 200 OK\r\nContent-Type: #{ct}\r\nContent-Length: #{body.bytesize}\r\nAccess-Control-Allow-Origin: *\r\nConnection: close\r\n\r\n"
          client.print body
        else
          client.print "HTTP/1.1 404 Not Found\r\nContent-Length: 9\r\nConnection: close\r\n\r\nNot Found"
        end
      end
    rescue => e
      # ignore
    ensure
      client.close rescue nil
    end
  end
end
