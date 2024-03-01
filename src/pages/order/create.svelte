<script>
import { Heading, Span, Fileupload, FloatingLabelInput, Img } from 'flowbite-svelte';
import { generateShortId } from '../../utils/String';
import { checkImageByUrl } from '../../utils/Imgur';
let container;
let image;
let placeholder;
let showImage = false;
let files;
let storeName = '';
let menuUrl = '';

$: if (files) {
  const file = files[0];
  if (file) {
    showImage = true;

    const reader = new FileReader();
    reader.addEventListener('load', function () {
      image = reader.result;
    });
    reader.readAsDataURL(file);
  } else {
    showImage = false;
  }
}

const onBlur = () => {
  if (menuUrl) {
    checkImageByUrl(menuUrl);
  }
};
</script>

<Heading tag="h3">開團菜單上傳</Heading>
<div class="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
  <div class="block">
    <div>
      <FloatingLabelInput label="Menu image url" class="mb-2" bind:value={menuUrl} />
    </div>
    <div>
      <Fileupload bind:files class="mb-2" />
    </div>
    {#if showImage}
      <Img src={image} alt="Preview" />
    {:else}
      <div class="flex justify-center h-96 w-96 items-center border-white border-2">
        <Span bind:this={placeholder}>Image Preview</Span>
      </div>
    {/if}
  </div>
  <div>
    <FloatingLabelInput label="店名" class="mb-2" bind:value={storeName} />
  </div>
</div>
