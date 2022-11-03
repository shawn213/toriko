<script lang="ts">
import * as yup from 'yup';
import axios from 'axios';
import { Form, Message } from 'svelte-yup';
import {
	FloatingLabelInput,
	Button,
	List,
	Li,
	Label,
	Range,
	Helper,
	Checkbox,
	Kbd,
	Progressbar,
} from 'flowbite-svelte';
import StarRating from '../../lib/Rating.svelte';
import Map from '../../lib/Map.svelte';
import { showMsg } from '../../stores/stores';
let lat = 22.611624148667726;
let lng = 120.29340837137883;
const checkboxStyle = [
	'font-normal',
	'p-1',
	'w-full',
	'text-gray-500',
	'bg-white',
	'rounded-lg',
	'border-2',
	'border-gray-200',
	'cursor-pointer',
	'dark:hover:text-gray-300',
	'dark:border-gray-700',
	'peer-checked:border-blue-600',
	'hover:text-gray-600',
	'dark:peer-checked:text-gray-300',
	'peer-checked:text-gray-600',
	'hover:bg-gray-50',
	'dark:text-gray-400',
	'dark:bg-gray-800',
	'dark:hover:bg-gray-700',
].join(' ');
const items = ['冷氣', '無限暢飲'];
let show = true;
const handleRefresh = () => {
	show = false;
	const [latitude, longitude] = fields.coordinate.split(/,/g);
	lat = parseFloat(latitude.trim());
	lng = parseFloat(longitude.trim());
	setTimeout(() => (show = true), 0);
};

let schema = yup.object().shape({
	storeName: yup.string().required().label('店名'),
	tags: yup.array().label('標籤'),
	coordinate: yup.string().required().label('座標'),
});
const fields = { storeName: '', nickName: '', speed: 5, delicious: 5, tags: [], coordinate: '' };
let submitted = false;
let isValid;
function formSubmit() {
	submitted = true;
	isValid = schema.isValidSync(fields);
	if (isValid) {
		let urlParameters = Object.entries({ ...fields, method: 'writeTempStore' })
			.map((e) => e.join('='))
			.join('&');
		axios.get(import.meta.env.VITE_API_URL + `?${urlParameters}`).then((res) => {
			if (res.data.result) {
				showMsg.set('新增成功');
			}
		});
	}
}
</script>

<div class="flex justify-center">
	<Form class="w-96 h-96" {schema} {fields} submitHandler={formSubmit} {submitted}>
		<List tag="ul" list="none" class="space-y-2 mb-2">
			<Li>
				<FloatingLabelInput bind:value={fields.storeName} label="店名" class="mb-2" />
				<Helper color="red"><Message name="storeName" /></Helper>
			</Li>
			<Li>
				<FloatingLabelInput bind:value={fields.nickName} label="暱稱" class="mb-2" />
			</Li>
			<Li>
				<Label>出餐速度</Label>
				<StarRating rating={fields.speed} />
				<Range id="range-steps" min="0" max="5" bind:value={fields.speed} step="0.5" />
			</Li>
			<Li>
				<Label>好吃程度</Label>
				<StarRating rating={fields.delicious} />
				<Range id="range-steps" min="0" max="5" bind:value={fields.delicious} step="0.5" />
			</Li>
			<Li>
				<Label class="mr-2">標籤</Label>
				<div class="flex flex-wrap">
					{#each items as item}
						<Checkbox custom bind:group={fields.tags} value={item} class="mr-2">
							<Kbd class={checkboxStyle}>
								{item}
							</Kbd>
						</Checkbox>
					{/each}
				</div>
				<Helper color="red"><Message name="tags" /></Helper>
			</Li>
			<Li>
				<FloatingLabelInput bind:value={fields.coordinate} label="座標" class="mb-2" />
				<Helper color="red"><Message name="coordinate" /></Helper>
			</Li>
			<Button on:click={handleRefresh} class="mb-2">確認定位</Button>
		</List>
		{#if show}
			<Map {lat} {lng} />
		{/if}
		<Button type="submit">送出</Button>
	</Form>
</div>
