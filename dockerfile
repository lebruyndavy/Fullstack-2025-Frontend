FROM nginx:latest

COPY index.html /usr/share/nginx/html
COPY favicon.svg /usr/share/nginx/html
COPY common /usr/share/nginx/html
COPY student1 /usr/share/nginx/html
COPY student2 /usr/share/nginx/html
COPY student3 /usr/share/nginx/html

EXPOSE 80 443     
CMD ["nginx", "-g", "daemon off;"]
