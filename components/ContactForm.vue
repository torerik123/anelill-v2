<template>
	<v-lazy
        v-model="isActive"
        :options="{
          threshold: .5
        }"
        transition="fade-transition"
    >
		<v-sheet id="contact" height="auto">
			<v-row>
				<v-col cols="12" class="text-center">
					<h2 class="py-10">Contact</h2>
				</v-col>
			</v-row>

			<p class="text-center" v-if="messageSent">{{ messageDeliveredText }}</p>
					
			<v-sheet :width="$vuetify.display.smAndDown ? '100%' : '50%' " class="mx-auto" >
				<v-form 
					ref="form"
					class="mx-auto mb-2" 
				>
					<v-row dense no-gutters class="">
						<v-col cols="12">
							<v-text-field 
								label="Name"
								v-model="name" 
								required 
								variant="solo" 
								hide-details="auto" 
								class="mb-4"
								:rules="[rules.required]"
							>
							</v-text-field>
						</v-col>
					</v-row>
					<v-row dense no-gutters class="">
						<v-col cols="12">
							<v-text-field 
								label="Email" 
								v-model="email" 
								required 
								variant="solo" 
								hide-details="auto" 
								class="mb-4"
								:rules="[rules.email]"
							></v-text-field>
						</v-col>
					</v-row>
					<v-row dense no-gutters class="">
						<v-col cols="12">
							<v-textarea 
								label="Message"
								v-model="message"
								required 
								variant="solo" 
								hide-details="auto" 
								class="mb-4"
								:rules="[rules.required]"
							>
							</v-textarea>
						</v-col>
					</v-row>
					<v-row dense no-gutters class="">
						<v-col cols="12">
							<v-spacer></v-spacer>
							<v-btn
								large
								:block="$vuetify.display.smAndDown"
								@click="submitForm"
								color="primary"
								class=""
							>
								Submit
							</v-btn>
						</v-col>
					</v-row>
				</v-form>
			</v-sheet>
		</v-sheet>
	</v-lazy>
</template>

<script>
export default {
	name: "ContactForm",

	data() {
		return {
			isActive: false,
			rules: {
				required: value => !!value || 'Field can not be empty.',
				email: value => {
					const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					return pattern.test(value) || 'Invalid e-mail.'
				},
			},
			valid: true,
			name: "",
			email: "",
			message: "",
			messageSent: false,
			messageDeliveredText: "Message sent!",
		}
	},

	methods: {
		async submitForm() {
			const { valid } = await this.$refs.form.validate()

			if (valid) {
				const data = { 
					name: this.name, 
					email: this.email, 
					message: this.message, 
				}

				const { data: response, error } = await useFetch("https://formspree.io/f/xzbwwdzy", {
					method: "POST",
					headers: {
         			   'Accept': 'application/json'
					},
					body: data,
				})

				if (response.value) {
					this.messageSent = true
					this.$refs.form.reset()
				} else {
					this.messageDeliveredText = "Something went wrong! Please try again later."
					console.log(error)
				}
			}
		}
	}
}
</script>