<template>
    <div>
        <Header></Header>
        <main class="bg-white">
            <Nuxt />
        </main>
        <!-- <Footer></Footer> -->
    </div>
</template>

<script>
import Header from "./header";
// import Footer from "./footer";

export default {
    components: {
        Header,
        // Footer,
    },
    layout: "default",
};
</script>
