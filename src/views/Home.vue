<template>
  <div class="Home">
    <section class="Home-head"></section>
    <section class="Home-title">
      <h1 class="title is-1">SupBank</h1>
    </section>
    <section class="Home-description">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia leo lacus, sed convallis turpis sagittis vitae. Aliquam erat volutpat. Etiam sed lectus volutpat, pretium orci sed, posuere augue. Fusce aliquet enim in fringilla venenatis. Donec aliquet neque et justo tristique dapibus. Aliquam fermentum sapien in molestie ullamcorper. Maecenas a libero sed eros malesuada egestas. Nullam non ullamcorper nisl. Integer vel lacus at diam semper consequat at eget diam. Phasellus dictum odio diam, non fermentum mauris faucibus sed. Praesent porttitor orci hendrerit ultrices rhoncus. Duis aliquet vestibulum quam id ullamcorper. Nam faucibus ligula sed diam ullamcorper condimentum.</p>
      <p>Mauris vitae velit eros. Donec non lacinia ipsum, quis euismod dolor. Mauris interdum odio ante, id porttitor arcu sodales quis. Mauris augue neque, facilisis vestibulum posuere eget, volutpat mattis odio. Morbi blandit enim quis ante vulputate tincidunt. Sed iaculis luctus elementum. Curabitur leo ante, pellentesque vel nibh nec, placerat fringilla lacus. Morbi vitae libero in justo iaculis faucibus in in metus. Vivamus bibendum eros bibendum finibus luctus.</p>
      <p>Maecenas vel neque at nunc gravida vestibulum. Sed ipsum justo, rutrum et sapien sed, dapibus feugiat mauris. Suspendisse tortor augue, mollis eu volutpat quis, dictum a lorem. Nulla enim ex, scelerisque nec vehicula vitae, tristique eget libero. Ut id fermentum lectus, sed convallis est. Mauris sodales eros non consectetur consequat. Suspendisse eleifend felis eget augue tempor, ac blandit justo pharetra.</p>
      <p>Integer vel convallis metus. Nulla et dignissim orci. Vestibulum congue dui quis ultricies laoreet. Suspendisse interdum tellus arcu, sollicitudin iaculis erat auctor et. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras scelerisque est risus, eu mattis dolor dignissim quis. Sed sed egestas nulla, non pharetra justo. Proin malesuada sodales ante a euismod.</p>
      <p>In eu suscipit risus. Aliquam convallis sodales nunc, non bibendum sapien laoreet ut. Maecenas sit amet risus ipsum. Morbi congue vestibulum libero nec egestas. Nulla a finibus ligula. Etiam eleifend ac ligula ac semper. Maecenas consequat nisi vel risus dignissim semper. Nullam ultricies nibh augue, in blandit velit molestie non. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac quam neque. Maecenas eu egestas lacus. Aenean ut sollicitudin erat.</p>
    </section>
  </div>
</template>

<script>
"use strict";

export default {
  name: "Home"
};
</script>

<style lang="scss">
.Home {
  &-head {
    left: 20%;
    width: 100%;
    height: 75vh;
    background-image: url("https://bitcoinist.com/wp-content/uploads/2017/05/ai-cryptocurrency-cover.jpg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center;
    opacity: 0.2;
  }
  &-title {
    position: absolute;
    top: 3rem;
    left: 20%;
    width: 100%;
    height: 75vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-description {
    padding: 2rem 20%;
    > p {
      margin-top: 1rem;
    }
  }
}
</style>
