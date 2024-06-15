<template>
    <div>
        <div class="bg-white w-full p-8 rounded-2xl">
            <div class="grid grid-rows-1 gap-8 md:grid-cols-12 xl:gap-8">
                <!-- Message -->
                <div class="md:col-span-12 xl:col-span-6 flex flex-col gap-4">
                    <h1 class="text-3xl font-bold text-gray-900">NEWXO</h1>
                    <p class="text-gray-600 text-justify">
                        "Gracias por elegirnos. Nos comprometemos a ofrecerte el mejor servicio y soporte. Si tienes alguna pregunta, necesitas asistencia, o deseas proporcionarnos retroalimentación, no dudes en contactarnos. Valoramos tu confianza y trabajamos continuamente para mejorar tu experiencia. ¡Tu satisfacción es nuestra prioridad!"
                    </p>
                </div>
                <!-- redes  -->
                <div class="md:col-span-4 xl:col-span-3">
                    <h2 class="font-bold uppercase">Redes sociales</h2>
                    <nav>
                        <a href=""
                            class="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg"
                            target="_blank">
                                <i class="fa-brands fa-facebook text-lg text-blue-500"></i>
                            FACEBOOK
                        </a>
                        <a href=""
                            class="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg"
                            target="_blank">
                            <i class="fa-brands fa-instagram text-lg"></i>
                            INSTRAGRAM
                        </a>
                        <a href="https://twitter.com/jtdevsmx"
                            class="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-lg"
                            target="_blank">
                            <i class="fa-brands fa-tiktok text-lg"></i>
                            TIK TOK
                        </a>
                    </nav>
                </div>
                <!-- contact -->
                <div class="md:col-span-4 xl:col-span-3">
                    <h2 class="font-bold uppercase">Contacto</h2>
                    <div class="flex flex-col gap-4">
                        <p class="flex items-center gap-2">
                            <span class="material-icons text-lg">
                                room
                            </span>
                            San Gil, Colombia
                        </p>
                        <p class="flex items-center gap-2">
                            <span class="material-icons text-lg text-[#04162d]">
                                email
                            </span>
                            newxoDev@gmail.com
                        </p>
                        <p class="flex items-center gap-2">
                            <i class="fa-solid fa-mobile text-lg"></i>
                            (+57) 311 8048146
                        </p>
                    </div>
                </div>
            </div>
            <hr class="my-4" />
            <!-- derechos -->
            <div class="flex flex-col xl:flex-row gap-4 items-center justify-between">
                <p class="text-gray-800 text-center md:text-left">
                    &copy; 2024
                    <span class="text-gray-900 font-bold">NEWXO</span> 
                    Todos los derechos reservados.
                </p>
                <div class="flex flex-col md:flex-row items-center gap-2">
                    <a href="#" class="text-gray-700 hover:text-gray-900 transition-colors">
                        Terminos y condiciones
                    </a>
                    <span class="text-black">/</span>
                    <a href="#" class="text-gray-700 hover:text-gray-900 transition-colors">
                        Política de privacidad
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>