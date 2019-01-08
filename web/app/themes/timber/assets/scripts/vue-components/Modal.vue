<template>
  <transition name="modal">
    <div :id="name" :name="name" v-if="visible" class="c-modal" :class="isActive">
      <div class="c-modal__overlay" @click.self="hide()"></div>
      <div class="c-modal__content">
        <button @click.prevent="hide()" class="c-modal__btn-close" aria-label="close">X</button>
        <div class="c-modal__body">
          <slot name="body"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: "modal",
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      visible: false
    };
  },
  computed: {
    ...mapGetters(["modal"]),
    isActive() {
      return this.visible ? "is-active" : "";
    }
  },
  watch: {
    modal() {
      if (this.modal == this.name) {
        this.show();
      }
    }
  },
  methods: {
    ...mapMutations(["setModal", "setBodyScroll"]),
    show() {
      this.visible = true;
      this.setBodyScroll(false);
      window.addEventListener("keyup", this.onEscapeKeyUp);
    },
    hide() {
      this.visible = false;
      this.setModal(null);
      this.setBodyScroll(true);
      window.removeEventListener("keyup", this.onEscapeKeyUp);
    },
    onEscapeKeyUp(event) {
      if (event.which === 27 && this.visible) {
        this.hide();
      }
    }
  },
  mounted() {},
  destroyed() {
    window.removeEventListener("keyup", this.onEscapeKeyUp);
  }
};
</script>
