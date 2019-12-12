import React from 'react';
import './footer.css';




function footer() {

  return (
 
<footer className="page-footer font-small pt-4 fonas">

 
  <div className="container-fluid text-center text-md-left">   
    <div className="row">    
      <div className="col-md-2 mt-md-5 mt-3 ">       
           
      </div>  

      <div className="pl-10 col-md-2 mt-md-1 mt-3 ">       
        <h5 className="text-uppercase text about">About us</h5>       
      </div> 
      <hr className="clearfix w-100 d-md-none pb-3"></hr>     
      <div className="col-md-4 mb-md-0 mb-3">      
        <h5 className="text-uppercase text">Contact information</h5>
        <ul className="list-unstyled text">
          <li>
            <h6>edvinas.deksnys@gmail.com</h6>
          </li>
          <li>
            <h6>+370 622 300 34</h6>
          </li>
        </ul>
      </div>   
      <div className="col-md-3 mb-md-0 mb-3 text">       
        <h5 className="text-uppercase">Having trouble deciding the design?</h5>
        <ul className="list-unstyled">
          <li>
            <a href="https://www.livingspaces.com/inspiration/catalogs" className='text'>Furniture catalogue</a>
          </li>
          <li>
            <a href="https://www.pinterest.com/search/pins/?q=furniture&rs=typed&term_meta[]=furniture%7Ctyped" className='text'>Pinterest</a>
          </li>       
        </ul>
      </div>      
    </div>
  </div>
  
  <div className="footer-copyright text-center py-3 text">© 2019 Copyright: Edvinas Deksnys  
  </div>
 
</footer>

    
  );
}

export default footer;





