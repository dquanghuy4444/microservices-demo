import axios from "axios"


const instance = axios.create({
	timeout: 6000
})

instance.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		console.log(error)
	}
)

export { instance }
