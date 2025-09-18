# Imagen base de Node.js 22
FROM node:22-alpine

# Crear directorio de la app
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json (si existe)
COPY package*.json ./

# Instalar dependencias (solo producción)
RUN npm install --production

# Copiar el resto del código
COPY . .

# Exponer el puerto 
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]
