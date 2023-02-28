export async function getFormDataObj(request: Request) {
	const formData = await request.formData();
	const formDataObj = Object.fromEntries(formData.entries());
	return formDataObj;
}
