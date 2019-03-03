
/*
<nav aria-label="pagination">
<ul class="pagination">
    <li>
      <a href="">
        <span aria-hidden="true">&laquo;</span><span class="visuallyhidden">previous set of pages</span></a>
    </li>
    <li>
      <a href=""><span class="visuallyhidden">page </span>1</a>
    </li>
    <li>
      <a href="" aria-current="page"><span class="visuallyhidden">page </span>2</a>
    </li>
    <li>
      <a href=""><span class="visuallyhidden">page </span>3</a>
    </li>
    <li>
      <a href=""><span class="visuallyhidden">page </span>4</a>
    </li>
    <li>
      <a href=""><span class="visuallyhidden">next set of pages</span><span aria-hidden="true">&raquo;</span></a>
    </li>
</ul>
</nav>
*/

const setNumPages = (numTotalCount) => {
  return Math.ceil(numTotalCount/process.env.PAGINATE_LIST_BY);
};

export const createPagination = (numTotalCount) => {
  //Si el número de paginas es mayor de uno entonces hay paginación
  const numPages = setNumPages(numTotalCount);

  if(numPages > 1){
      //contenedor
      const divPagination = document.createElement('div');
      divPagination.classList.add('pagination');

      //Página previa
      const aPreviousPage = document.createElement('a');
      aPreviousPage.setAttribute('href', '#');
      aPreviousPage.innerHTML = '&laquo;';
      
      //añadimos el enlace al contenedor a su contenedor
      divPagination.appendChild(aPreviousPage);

      //Paginas numeradas dinámicas
      for (let index = 0; index < numPages; index++) { 
        const aNumPage = document.createElement('a');
        aNumPage.setAttribute('id', `id_${index + 1}`);
        aNumPage.setAttribute('href', '#');
        aNumPage.innerHTML = `${index + 1}`;
            
        //añadimos el enlace al contenedor a su contenedor
        divPagination.appendChild(aNumPage);
      }
      
      //Página Siguiente
      const aNextPage = document.createElement('a');
      aNextPage.setAttribute('href', '#');
      aNextPage.innerHTML = '&raquo;';
      
      //añadimos el enlace al contenedor a su contenedor
      divPagination.appendChild(aNextPage);

  }
  
  };



