export const business = {
  name: 'MY STAR FOOD PRODUCTS',
  director: 'Suku Peethambaran',
  address: 'Mylakuzhy, Venjaramoodu, Thiruvananthapuram, Kerala, India',
  shortAddress: 'Mylakuzhy, Venjaramoodu',
  phone: '+91 9207779771',
  secondaryPhone: '+91 9207779770',
  whatsapp: '919207779771',
  secondaryWhatsapp: '919207779770',
  qrCodeImage: '/images/whatsapp-qr.png',
  email: 'mystarfood26@gmail.com',
  instagramHandle: 'mystarfood26',
  facebookName: 'my star food',
  youtubeName: 'My Star Food',
  socials: {
    instagram: 'https://www.instagram.com/mystarfood26',
    facebook: 'https://www.facebook.com/search/top?q=my%20star%20food',
    youtube: 'https://www.youtube.com/results?search_query=My+Star+Food',
  },
  logo: '/images/logo-crest.svg',
  heroImage: '/images/demo/collection.svg',
  companyImage: '',
};

export const navigation = [
  {href: '/', label: 'Home'},
  {href: '/about', label: 'About Us'},
  {href: '/products', label: 'Products'},
  {href: '/services', label: 'Services'},
  {href: '/contact', label: 'Contact Us'},
];

export const mapsUrl =
  'https://www.google.com/maps/search/?api=1&query=' +
  encodeURIComponent(business.address);
