<template>
      <div className="grid grid-cols-12 h-[100vh] justify-center items-center bg-white fullscreen">
      <div className="col-span-2"></div>
      <!-- content login  -->
      <div className="col-span-8 lg:rounded-lg lg:border border-black flex">
        <!-- logo  -->
        <div className="md:w-[40%] w-full  lg:p-10">
          <div className="w-full mb-10">
            <img
              src=""
              alt="logo"
              className="w-[90%]"
            />
          </div>
          <!-- inputs   -->
          <form>
            <div>
              <h4 className="lg:text-[17px]">
                <strong>Usuario</strong>
              </h4>
              
            </div>

            <div>
              <h4 className="lg:text-[17px]">
                <strong>Contraseña</strong>
              </h4>
              
            </div>
          </form>
          <!-- boton ingresar -->
          <div className="w-full flex items-center justify-center mt-5 ">
            <button class="border rounded-lg p-2 bg-[#04162d] text-white w-full lg:w-[150px] font-serif">
              INICIAR SESIÓN
            </button>
          </div>
        </div>
         <!-- img login -->
        <div className="w-[60%] hidden lg:block border-t border-r border-b rounded-tr-lg rounded-br-lg">
          <img src="" className="w-full h-full" />
        </div>
      </div>
      <div className="col-span-2"></div>
    </div>
</template>

<!-- it-comunicaciones-logo.png  -->
<!-- img-login-it.jpg -->