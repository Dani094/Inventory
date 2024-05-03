<template>
    <div class="lg:pl-40 lg:pr-10 p-4">
        <!-- title  -->
        <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            <div>
                <h1 class="text-[#5A30FC] text-3xl font-bold pt-4 rounded-xl">Home</h1>
            </div>
            <!-- search  -->
            <div class='w-80'>
                <div className="w-full relative">
                    <span
                        className="material-icons text-lg text-[#5A30FC] font-bold absolute left-3 top-1/2 -translate-y-1/2">
                        search
                    </span>
                    <input type="text" placeholder='Buscar'
                        className="bg-white w-full py-2 pl-10 pr-4 rounded-lg outline-none" />
                </div>
            </div>
        </div>
        <!-- graficas  -->
        <div class="bg-white rounded-2xl">
            <img class="rounded-2xl" src="https://apiumhub.com/wp-content/uploads/2020/03/Attract-new-software-developers.png" alt="grafica">
        </div>
    </div>
</template>