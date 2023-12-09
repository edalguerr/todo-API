# Usa una imagen de Node.js como base
FROM node:latest

# Establece el directorio de trabajo en la aplicación
WORKDIR /usr/src/app


# Copia los archivos de configuración del proyecto (por ejemplo, package.json y package-lock.json)
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto en el que la aplicación se ejecutará (ajusta según las necesidades de tu aplicación)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:dev"] 
