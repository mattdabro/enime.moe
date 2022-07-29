<template>
  <Html>
    <Head>
      <Title>Enime</Title>
      <Script async src="https://arc.io/widget.min.js#ZGU5XFjQ"/>
      <Link rel="icon" href="/favicon.ico"/>
    </Head>

    <NuxtLayout>
      <NuxtLoadingIndicator color="white" :height="2" />
      <NuxtPage />
    </NuxtLayout>
  </Html>
</template>

<script>
export default {
  name: "app"
}
</script>