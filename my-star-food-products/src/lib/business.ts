export const business = {
  name: 'MY STAR FOOD PRODUCTS', director: 'Suku Peethambaran',
  address: 'Mylakuzhy, Venjaramoodu, Thiruvananthapuram, Kerala, India',
  phone: '+91 9207779771', secondaryPhone: '+91 9207779770',
  whatsapp: '919207779771', email: 'mystarfood26@gmail.com',
  instagramHandle: '@mystarfood26', facebookName: 'My Star Food', youtubeName: 'My Star Food',
  // Add only verified full URLs. Empty values are never rendered as links.
  socials: {instagram: '', facebook: '', youtube: ''},
  // Set these to supplied files under public/ when approved assets are available.
  logo: '', heroImage: '/images/demo/collection.svg', companyImage: '',
};
export const navigation = [
  {href: '/', label: 'Home'}, {href: '/about', label: 'About Us'},
  {href: '/products', label: 'Products'}, {href: '/services', label: 'Services'},
  {href: '/contact', label: 'Contact Us'},
];
export const mapsUrl = 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(business.address);
