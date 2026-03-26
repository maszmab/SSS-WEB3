// js/app.js
let provider;
let signer;

async function initSSS() {
    const statusMsg = document.getElementById("statusMsg");
    const exclusiveArea = document.getElementById("exclusiveContent");

    if (!window.ethereum) {
        statusMsg.innerText = "Gunakan Browser MetaMask!";
        return;
    }

    try {
        // Step 1: Minta akses akun (Penting untuk Mobile)
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        provider = new ethers.BrowserProvider(window.ethereum);
        signer = await provider.getSigner();
        const address = await signer.getAddress();

        // Step 2: Cek Jaringan (Sepolia ID: 11155111)
        const network = await provider.getNetwork();
        if (network.chainId !== 11155111n) {
            statusMsg.innerText = "⚠️ Pindah ke Jaringan Sepolia di MetaMask Anda!";
            return;
        }

        // Step 3: Verifikasi NFT
        const contractAddress = "0x88F432e01f23ed5d8156Adb92137Dc580790237e";
        const abi = ["function balanceOf(address owner) view returns (uint256)"];
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const balance = await contract.balanceOf(address);

        if (Number(balance) > 0) {
            statusMsg.innerText = "✅ Akses Diterima!";
            exclusiveArea.style.display = "block";
        } else {
            statusMsg.innerText = "❌ NFT SSS tidak ditemukan di dompet ini.";
        }
    } catch (error) {
        console.error(error);
        statusMsg.innerText = "Koneksi Gagal. Coba klik Connect kembali.";
    }
}

// Tambahan agar otomatis deteksi ganti akun di HP
if (window.ethereum) {
    window.ethereum.on('accountsChanged', () => {
        window.location.reload();
    });
    window.ethereum.on('chainChanged', () => {
        window.location.reload();
    });
}

async function bayarProduk() {
    try {
        if (!signer) {
            alert("Hubungkan dompet dulu!");
            return;
        }
        const myWallet = "0x5945aaf0c8bd7c286603595982e689ca559bb687";
        const tx = await signer.sendTransaction({
            to: myWallet,
            value: ethers.parseEther("0.01")
        });
        alert("Transaksi dikirim! Tunggu konfirmasi...");
        await tx.wait();
        alert("✅ Pembayaran Berhasil!");
    } catch (error) {
        alert("Transaksi Dibatalkan.");
    }
}
