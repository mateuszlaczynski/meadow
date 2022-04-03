import React from 'react';
import Base from '../base/Base';
import about1 from '../base/images/About1.png'
import about2 from '../base/images/About2.png'
import about3 from '../base/images/About3.png'

const About = () => {
  return <Base title='Meadow | Więcej o nas' container={true}>
        <div style={{marginTop:"10px"}} className='row'>
            <div className='col-12 col-lg-5'>
                <img className='img-fluid' style={{maxHeight:600}}
                alt="About" src={about1}></img>
            </div>
            <div className='col-12 col-lg-7 my-auto'>
               <p className='mx-4' style={{fontSize:28, textAlign:'justify'}}>
                Firma PW MIPEXIM, właściciel marki "meadow" została założona w 1992 roku
                przez Marka Łączyńskiego. Od ponad 30 lat prowadzimy działalność usługową i
                produckyjną związaną ze sportem. Współpracujemy z profesjonalnymi zawodnikami
                aby nasze produkty dorównywały potrzebom sportowców na najwyższym poziomie.
               </p>
            </div>
        </div>

        <div style={{marginTop:"50px"}} className='row'>
            <div className='col-12 col-lg-7 my-auto'>
               <p className='mx-4' style={{fontSize:28, textAlign:'justify'}}>
                Produkty marki "meadow" są wykonane z dbałością o detale, wszystko po to aby
                jak największy komfort i jakość podczas wysiłku fizycznego. Stawiamy sobie
                wysokie standardy, dlatego cały proces produkcji naszej odzieży jest ulokowany
                w Polsce, od wstępnego projektowania, po szycie i dystrybucję.
               </p>
            </div>
            <div className='col-12 col-lg-5'>
                <img className='img-fluid' style={{maxHeight:600}}
                alt="About" src={about2}></img>
            </div>
        </div>

        <div style={{marginTop:"50px"}} className='row'>
            <div className='col-12 col-lg-5'>
                <img className='img-fluid' style={{maxHeight:600}}
                alt="About" src={about3}></img>
            </div>
            <div className='col-12 col-lg-7 my-auto'>
               <p className='mx-4' style={{fontSize:28, textAlign:'justify'}}>
                Sport to nie tylko ubrania, prowadzimy również działalność usługową
                skupiającą się na rozwoju perspektywicznych sportowców, między innnymi
                prowadząć agencję menedżerską wspieracjących młodych koszykarzy czy
                organizując obozy koszykarskie dla dzieci i młodzieży "Meadow Basket Camp".
                Organizujemy różwnież wyjazdy na obozy koszykarskie do Serbii, jednym
                z nich jest KASTA Belgrad, która od ponad 20 lat prowadzi obozy szkoleniowe
                dla młodzieży z całej Europy.
               </p>
            </div>
        </div>
  </Base>;
};

export default About;