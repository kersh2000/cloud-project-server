const palettes = [
  {
    title: 'Ocean Breeze',
    description: 'A palette inspired by the calming colors of the ocean.',
    colours: ['#7FB3D5', '#8FD8DE', '#B1E1E6', '#C6E5EA', '#E3F0F3'],
    public: false
  },
  {
    title: 'Sunset Vibes',
    description: 'Capture the warmth and beauty of a breathtaking sunset.',
    colours: ['#FF9F80', '#FF7F50', '#FF512F', '#DE3163', '#9B287B'],
    public: true
  },
  {
    title: 'Spring Blossoms',
    description: 'Celebrate the blooming colors of springtime flowers.',
    colours: ['#FFDDC1', '#FFC0A2', '#FF8F80', '#FF606D', '#FF3333'],
    public: true
  },
  {
    title: 'Elegant Monochrome',
    description: 'A sophisticated palette of black and white tones.',
    colours: ['#FFFFFF', '#F2F2F2', '#CCCCCC', '#999999', '#000000'],
    public: true
  },
  {
    title: 'Autumn Leaves',
    description: 'Rich and warm colors reminiscent of the fall season.',
    colours: ['#FFB74D', '#FF8A65', '#D84315', '#6D4C41', '#37474F'],
    public: false
  },
  {
    title: 'Vibrant Neon',
    description: 'Bold and eye-catching colors that demand attention.',
    colours: ['#FF4081', '#80D8FF', '#FFEB3B', '#4CAF50', '#FF5722'],
    public: true
  },
  {
    title: 'Pastel Dreams',
    description: 'Soft and dreamy hues that create a serene atmosphere.',
    colours: ['#F48FB1', '#CE93D8', '#B39DDB', '#90CAF9', '#80DEEA'],
    public: false
  },
  {
    title: 'Earthy Tones',
    description: 'Natural and earthy colors inspired by the outdoors.',
    colours: ['#BCAAA4', '#A1887F', '#8D6E63', '#795548', '#6D4C41'],
    public: true
  },
  {
    title: 'Fresh Citrus',
    description: 'Zesty and refreshing colors reminiscent of citrus fruits.',
    colours: ['#FFEE58', '#FFCA28', '#FFA726', '#FF7043', '#F4511E'],
    public: false
  },
  {
    title: 'Cozy Winter',
    description: 'Warm and cozy colors that evoke a winter ambiance.',
    colours: ['#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575', '#616161'],
    public: true
  }
],
users = [
  { username: 'john_doe', password: 'password123' },
  { username: 'jane_smith', password: 'password456' },
  { username: 'test_user', password: 'test123' }
];

module.exports = { palettes, users };