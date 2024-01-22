<script>
    export let showModal = false;
    
    // Function to close the modal
    function closeModal() {
      showModal = false;
    }
  </script>
  
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  {#if showModal}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="modal" on:click={closeModal}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="modal-content" on:click|stopPropagation>
      <button class="close" on:click={closeModal}>&times;</button>
      <slot></slot>
    </div>
  </div>
  {/if}
  
  <style>
    .modal {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
    }
    .modal-content {
      background-color: #fefefe;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
      position: relative;
    }
    .close {
      position: absolute;
      top: 10px;
      right: 15px;
      font-size: 25px;
      background: none;
      border: none;
    }
  </style>