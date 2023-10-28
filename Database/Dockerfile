# Utiliza la imagen oficial de MySQL como base
FROM mysql:8.0

# Establece las variables de entorno para la base de datos
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=bmxdb
ENV MYSQL_USER=bmxuser
ENV MYSQL_PASSWORD=BM3X34s4MsUs81*01

# Copia los archivos SQL a la imagen
COPY Database/init.sql /docker-entrypoint-initdb.d/

# Expone el puerto de MySQL
EXPOSE 3306
