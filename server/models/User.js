import mongoose from 'mongoose';

// создание таблицы
const UserSchema = new mongoose.Schema(
  {
    // таблица будет хранить в себе fullname, email, passwordHash, avatarUrl
    fullname: {
      type: String, // указываем тип
      required: true, // указываем на обязательность заполнения
    },
    email: {
      type: String,
      required: true,
      unique: true, // указываем на уникальность почты
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: String,
  },
  {
    timestamps: true, // указываем чтобы при создании пользователя прикручивалось дата создания и обновления
  },
);

export default mongoose.model('User', UserSchema); // название схемы 'User' и указание самой схемы UserSchema
