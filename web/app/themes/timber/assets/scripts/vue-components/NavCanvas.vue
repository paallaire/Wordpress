<template>
  <div class="l-nav-canvas">
    <transition name="l-nav-canvas--transition-menu">
      <div class="l-nav-canvas__menu" v-if="hasMenuCanvas">
        <slot name="content"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import im from "../../../node_modules/include-media-export/dist/include-media-1.0.2.min.js";
import _debounce from "lodash/debounce";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: "navCanvas",
  props: {},
  computed: {
    ...mapGetters(["hasMenuCanvas"])
  },
  watch: {
    hasMenuCanvas() {
      if (this.hasMenuCanvas) {
        this.setBodyScroll(false);
      } else {
        this.setBodyScroll(true);
      }
    }
  },
  methods: {
    ...mapMutations(["setNavCanvas", "setBodyScroll"]),
    close() {
      this.setNavCanvas(false);
    }
  },
  mounted() {
    this.resize = _debounce(e => {
      if (im.greaterThan("medium") && this.hasMenuCanvas) {
        this.close();
      }
    }, 250);

    window.addEventListener("resize", this.resize);
  },
  destroyed() {
    window.removeEventListener("resize", this.resize);
  }
};
</script>
