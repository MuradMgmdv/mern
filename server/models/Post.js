import mongoose from 'mongoose';

// создание таблицы
const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      unique: true,
    },
    tags: {
      type: Array,
      default: [],
    },

    // указывам количество просмотров viewsCount
    viewsCount: {
      type: Number,
      default: 0, // когда статья создастся по умолчанию юудет 0 просмотров
    },
    // вместе с созданными постами будет указан пользователь, который их создал
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // ссылаемся на модель User, чтобы оттуда получить пользователя, который создает пост
      required: true, // указываем обязательность свойства
    },
    imageUrl: String,
  },
  {
    timestamps: true, // указываем чтобы при создании пользователя прикручивалось дата создания и обновления
  },
);

export default mongoose.model('Post', PostSchema); // название схемы 'Post' и указание самой схемы PostSchema
