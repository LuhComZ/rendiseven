const axios = require('axios');
const url = "http://www.7setembro.com.br/Hand7/BoletimNotas.aspx";

class Hand7 {

	static parseHTML(response)
	{
		if (response.request.res.responseUrl === 'http://www.7setembro.com.br/Hand7/Default.aspx')
		{
			return true
		} else {
			return false
		}
	}

	static async getStudent(ra, token) {
		const response = await axios.get(url, {
			headers: {
				Cookie: `logintool7=${ra}; loginhtool7=${token}`
			}
		})

		return this.parseHTML(response)
	}


	static async verifyToken(ra, token) {
		const nice = await this.getStudent(ra, token);
		return !nice.cool
	}
}

module.exports = Hand7;