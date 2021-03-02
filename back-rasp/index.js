var express = require('express'); 
var SSH2Promise = require('ssh2-promise');
const sshconfig2 = {
    host: '10.3.141.1',
    username: 'ssh_miroir',
    password: 'ssh_miroir',
  }
// Nous définissons ici les paramètres du serveur.
var hostname = 'localhost'; 
var port = 3000; 
var app = express(); 

app.get("/wifiscan",async (req,res)=>{
    const ssh = new SSH2Promise([sshconfig2])
    const data = await ssh.exec('parse.sh')
    const tab = data.split('\n')
    const test = { wifi: [] }
    for (let i = 0; i < tab.length; i++) {
      if (tab[i].length !== 0) {
        test.wifi.push(tab[i])
      }
    }
    return res
  })

  app.get("/", (req,res)=>{
    return res.json({message : "Bienvenue sur notre Frugal API ", methode : req.method});
  })
app.post("/sendWifi",async  (req,res)=>{
    const ssh = new SSH2Promise([sshconfig2])
    // A quoi ça sert ??
    // TODO METTRE DANS LE SERVICE

    await ssh.exec(
      ' echo -e network={ ssid=\\"' +
        body.ssid +
        '\\" psk=\\"' +
        body.password +
        '\\"} >> /etc/wpa_supplicant/wpa_supplicant.conf ',
    )
    /** PBM : ET SI CA MARCHE PAS 200 QUAND MEME ?**/
    return res.sendStatus(200)
})
app.listen(port, function(){
	console.log("Mirror back running on sur http://"+ hostname +":"+port+"\n"); 
});
 