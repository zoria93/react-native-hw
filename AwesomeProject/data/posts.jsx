export const postsScreenArr = [
  {
    id: 1,
    img: "https://faktypro.com.ua/uploads/img/cikavi-fakti-pro-lisi-i-dereva.jpg",
    title: "Ліс",
    location: "Ukraine",
    comments: 8,
    likes: 153,
  },
  {
    id: 2,
    img: "https://faktypro.com.ua/uploads/img/cikavi-fakti-pro-lisi-i-dereva.jpg",
    title: "Захід на Чорному морі",
    location: "Ukraine",
    comments: 3,
    likes: 200,
  },
  {
    id: 3,
    img: "https://faktypro.com.ua/uploads/img/cikavi-fakti-pro-lisi-i-dereva.jpg",
    title: "Старий будиночок у Венеції",
    location: "Italy",
    comments: 50,
    likes: 200,
  },
  {
    id: 4,
    img: "https://faktypro.com.ua/uploads/img/cikavi-fakti-pro-lisi-i-dereva.jpg",
    title: "Старий будиночок у Венеції",
    location: "Italy",
    comments: 50,
    likes: 200,
  },
];

export const profilePostArr = [
  {
    id: 1,
    img: require("../assets/images/forest.jpg"),
    title: "Ліс",
    location: "Ukraine",
    comments: 8,
    likes: 153,
  },
  {
    id: 2,
    img: require("../assets/images/sunset.jpg"),
    title: "Захід на Чорному морі",
    location: "Ukraine",
    comments: 3,
    likes: 200,
  },
  {
    id: 3,
    img: require("../assets/images/oldhouse.jpg"),
    title: "Старий будиночок у Венеції",
    location: "Italy",
    comments: 50,
    likes: 200,
  },
];

export const commentPostArr = {
  id: 1,
  postImage: require("../assets/images/sunset.jpg"),
  title: "Sunset on the Black Sea",
  location: "Ukraine",
  comments: 3,
  commentsTexts: [
    {
      id: 1_1,
      date: "09 червня, 2020",
      time: "08:40",
      userAvatar: require("../assets/images/commentsAvatar.jpg"),
      text: "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
    },
    {
      id: 1_2,
      userAvatar: require("../assets/images/commentsAvatarNatali.jpg"),
      date: "09 червня, 2020",
      time: "09:14",
      text: "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.",
    },
    {
      id: 1_3,
      date: "09 червня, 2020",
      time: "09:20",
      userAvatar: require("../assets/images/commentsAvatar.jpg"),
      text: "Thank you! That was very helpful!",
    },
  ],
};
