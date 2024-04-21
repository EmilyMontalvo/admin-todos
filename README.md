This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Development
Pasos para levantar la app en desarrollo

1. Configurar o crear el archivo docker-compose.yml según tus necesidades 
2. Levantar la base de datos
```
docker compose up -d
```
3. Renombrar el .env.template a .env 
4. Reemplazar las variables de entorno
5. Ejecutar el SEED para crear la [base de datos local](localhost:3000/api/seed)

## Prisma commands
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

## Producción
