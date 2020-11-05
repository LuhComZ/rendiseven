const fs = require('fs');
const Hand7 = require('./hand7');

const hook = "https://discord.com/api/webhooks/701961138765561957/zPy5T-bCATfnl2i90-yaNDwnjuLRNuNNxYR17qmQlm_64ETR2BAdxUHfLWZpbPxb4FKl"

const data = JSON.parse(fs.readFileSync('./data.json'));

function generatePassword(length) {
	const charset = "abcdefghijklmnopqrstuvwxyz0123456789"
	let retVal = "";
	for (var i = 0, n = charset.length; i < length; ++i) {
		retVal += charset.charAt(Math.random() * n);
	}
	return retVal;
}

function getAllTokens() {
	const tempToken = generatePassword(32);

	while (Object.keys(data).includes(tempToken) && Object.keys(data).length < Math.pow(32, 36)) {
		tempToken = generatePassword(32);
	}

	data[tempToken] = 0;
}

async function giveThemRa() {
	Object.keys(data).forEach(async token => {
		for (let i = 200000; i <= 210000; i++) {
			const nice = await Hand7.getStudent(i, token);
			if (nice)
			{
				data[token] = i;
				fs.writeFileSync("./data.json", JSON.stringify(data));
				console.log(`Salvei o RA ${i} para o token ${token}`);
				await axios.post(hook, {
					data: {
						content: `Salvei o RA ${i} para o token ${token}`
					}
				})
			}
		}
	})
}

getAllTokens();

giveThemRa();