#!/bin/bash

# Настройки
DB_USER="postgres"
DB_NAME="your_database"
BACKUP_DIR="/path/to/backup"
DAYS_TO_KEEP=7
DATE=$(date +%Y-%m-%d_%H-%M-%S)

# Переменная для пароля
export PGPASSWORD="your_password"

# Создаем папку для бэкапов, если её нет
mkdir -p "$BACKUP_DIR"

# Делаем дамп базы данных (в кастомном сжатом формате pg_dump -Fc)
pg_dump -U "$DB_USER" -F c -b -v -f "$BACKUP_DIR/${DB_NAME}_$DATE.backup" "$DB_NAME"

# Удаляем копии старше указанного количества дней
find "$BACKUP_DIR" -type f -name "${DB_NAME}_*.backup" -mtime +$DAYS_TO_KEEP -exec rm {} \;

# Сбрасываем переменную пароля в целях безопасности
unset PGPASSWORD

echo "Бэкап PostgreSQL успешно создан: ${DB_NAME}_$DATE.backup"
