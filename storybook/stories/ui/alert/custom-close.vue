<template>
  <div class="story story-alert">
    <h2>Customizable close</h2>
    <vue-markdown>Use `:closable="false"` to hide the close button.</vue-markdown>
    <el-alert
        title="alert without close"
        type="success"
        :closable="false"
    >
    </el-alert>

    <vue-markdown>Use `close-text="My Text"` to customize the close button.
        Note: *This* **only** supports text, no vue elements or icons.</vue-markdown>
    <el-alert
        title="alert with custom close icon"
        close-text="Gotcha"
    >
    </el-alert>

  </div>
</template>
