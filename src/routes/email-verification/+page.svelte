<script>
    // You can add script logic here if needed
    import image from '../logo.webp'
  </script>
  
  <style>
    /* Center the content */
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh; /* Ensure full viewport height */
    }
  
    /* Adjust image size */
    img {
      max-width: 50%; /* Set maximum width to the container width */
      height: auto; /* Maintain aspect ratio */
      margin-bottom: 10px;  
    }
  </style>
  
  <div>
    <!-- Success logo -->
    <img src={image} alt="Success Logo" />
  
  </div>