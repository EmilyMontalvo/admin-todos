This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Development
Pasos para levantar la app en desarrollo

1. Configurar o crear el archivo docker-compose.yml según tus necesidades 
2. Levantar la base de datos
```
docker compose up -d
```
3. Renombrar el .env.template a .env y configurar la cadena de conexión a la bd
4. Reemplazar las variables de entorno
5. Ejecutar el comando ``` npm install ``` para descargar los modulos de node
6. Ejecutar el comando ``` npm run dev ``` 
7. Ejecutar los comandos para la migración en prisma
8. Ejecutar el SEED para crear la [base de datos local](localhost:3000/api/seed)

## Prisma commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

## Producción
