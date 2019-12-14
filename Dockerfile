#
# Example:
#   CMD> docker run -d --name <customname> -p <openport>:80 <imagename>:<tag>
#

# Assert Nginx web server 1.17.6 (latest)
FROM httpd

# Assert Deploy production (DO NOT USE * IF YOU WANT TO KEEP SUBFOLDERS)
COPY src/www/ /usr/local/apache2/htdocs/

# Assert Open port
EXPOSE 80