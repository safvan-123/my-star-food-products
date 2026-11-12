import {ImageResponse} from 'next/og';
export const alt='MY STAR FOOD PRODUCTS · Spices, masalas, rice flour and retail supply · Venjaramoodu, Kerala';
export const size={width:1200,height:630};
export const contentType='image/png';
export default function OpenGraph(){return new ImageResponse(<div style={{background:'linear-gradient(115deg,#102e27,#2d684b)',color:'#fff9ee',display:'flex',flexDirection:'column',justifyContent:'center',width:'100%',height:'100%',padding:80,borderBottom:'14px solid #e0aa63'}}><div style={{fontSize:22,letterSpacing:5,color:'#f1c994',marginBottom:27}}>VENJARAMOODU · KERALA · RETAIL SUPPLY</div><div style={{fontSize:90,fontWeight:700,lineHeight:1}}>MY STAR</div><div style={{fontSize:48,marginTop:4}}>FOOD PRODUCTS</div><div style={{fontSize:26,marginTop:40,color:'#f3d7ad'}}>Spices · Masalas · Rice Flour · Shop Supply</div></div>,size);}
