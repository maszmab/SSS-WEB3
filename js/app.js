// js/app.js
async function initSSS() {
    const statusMsg = document.getElementById("statusMsg");
    const exclusiveArea = document.getElementById("exclusiveContent"); // PERBAIKAN: Harus "exclusiveContent"

    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        // Alamat Kontrak Terbaru Anda
        const contractAddress = "0x88F432e01f23ed5d8156Adb92137Dc580790237e";
        
        const abi = ["function balanceOf(address owner) view returns (uint256)"];
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const balance = await contract.balanceOf(address);

        if (Number(balance) > 0) {
            statusMsg.innerText = "✅ Akses Diterima!";
            exclusiveArea.classList.remove("hidden"); // Gunakan classList untuk menyembunyikan/menampilkan
            exclusiveArea.style.display = "block";
        } else {
            statusMsg.innerText = "❌ NFT tidak ditemukan. Silakan Mint di Remix.";
            exclusiveArea.style.display = "none";
        }
    } catch (error) {
        console.error(error);
        statusMsg.innerText = "Koneksi Gagal. Cek Jaringan Sepolia.";
    }
}

async function bayarProduk() {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const myWallet = "0x5945aaf0c8bd7c286603595982e689ca559bb687";
        
        console.log("Memulai pembayaran ke:", myWallet);
        const tx = await signer.sendTransaction({
            to: myWallet,
            value: ethers.parseEther("0.01")
        });

        alert("Transaksi dikirim! Tunggu konfirmasi...");
        await tx.wait();
        alert("✅ Pembayaran Berhasil! Pesanan Anda segera diproses.");
    } catch (error) {
        console.error("Gagal bayar:", error);
        alert("Transaksi dibatalkan.");
    }
}
