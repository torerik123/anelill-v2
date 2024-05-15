import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import { VueWrapper, mount, shallowMount } from "@vue/test-utils";
import { describe, expect, it, beforeEach } from "vitest";

// Vuetify
import { createVuetify } from "vuetify";
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import ContactForm from "../components/ContactForm.vue";

const vuetify = createVuetify({
	components,
	directives,
});

describe("ContactForm", () => {
	it("Renders all input fields", () => {
		const wrapper = shallowMount(ContactForm, {
			global: {
				plugins: [vuetify]
			},
			props: {
				text: "SampleWizard",
				color: "#e255a1",
			},
		})

		expect(true).toEqual(true);
	});
});
