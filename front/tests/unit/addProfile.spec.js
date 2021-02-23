// import { shallowMount } from "@vue/test-utils";
// import AddProfile from "@/components/AddProfile";

// const factory = (values = {}) => {
//   return shallowMount(AddProfile, {
//     data() {
//       return {
//         ...values
//       };
//     }
//   });
// };

// describe("AddProfile", () => {
//   it("Adding a profile according to the username entered ", () => {
//     const wrapper = shallowMount(AddProfile, {
//       data() {
//         return {
//           profileName: "",
//           isProfileNameInvalid: false,
//           errorMessage: ""
//         };
//       }
//     });
//   });

//   it("Test empty profileName adding", () => {
//     const wrapper = factory({ profileName: "" });
//     expect(wrapper.find(".isProfileNameInvalid")).toBeTruthy();
//   });

//   it("Test profileName already used", () => {
//     const wrapper = factory({ profileName: "user" });
//     expect(wrapper.find(".isProfileNameInvalid")).toBeTruthy();
//   });
// });
