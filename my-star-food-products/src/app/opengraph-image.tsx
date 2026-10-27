import {ImageResponse} from 'next/og';
export const alt='MY STAR FOOD PRODUCTS · Venjaramoodu, Kerala';
export const size={width:1200,height:630};
export const contentType='image/png';
export default function OpenGraph(){return new ImageResponse(<div style={{background:'#25008F',color:'#FFF8E7',display:'flex',flexDirection:'column',justifyContent:'center',width:'100%',height:'100%',padding:85,borderBottom:'12px solid #D4A537'}}><div style={{fontSize:21,letterSpacing:6,color:'#F3CF6E',marginBottom:35}}>VENJARAMOODU · KERALA</div><div style={{fontSize:76,fontWeight:700}}>MY STAR</div><div style={{fontSize:48}}>FOOD PRODUCTS</div><div style={{fontSize:25,marginTop:40,color:'#F3CF6E'}}>Explore our products. Start a conversation.</div></div>,size);}
