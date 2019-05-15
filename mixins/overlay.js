export default {
    methods: {
        open() {
            document.body.classList.add(this.overlayClass || "hasOverlay");
        },
        close() {
            document.body.classList.remove(this.overlayClass || "hasOverlay");
        },
    },
};
