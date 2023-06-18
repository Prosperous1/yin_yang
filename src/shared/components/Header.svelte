<script>
	import NavButton from "./NavButton.svelte";
</script>

<nav>
    <a href="/" class="logo">
        <img src="/logo.svg" alt="Yin Yang">
        <div class="logo_text">
            <p>Yin</p>
            <p>Yang</p>
        </div>
    </a>
    <div class="sub_header_container">
        <NavButton isButton={true} link="account" color="black" title="Профиль" icon="/icons/ui/Logout.svg"/>
        <NavButton link="profile" color="black" title="Профиль" icon="/icons/ui/account.svg"/>
		<NavButton link="cart" color="black" title="Корзина" icon="/icons/ui/basket.svg"/>
    </div>
</nav>

<style lang="scss">
	nav {
		max-width: 1240px;
		margin: 0 auto;
		padding: 40px 40px 0 40px;
		display: flex;
		align-items: center;
		justify-content: space-between;

	}
	.logo {
		display: flex;
		@media (max-width: 768px) {
			margin-bottom: 20px;
		}
	}
	.logo_text {
		font-family: Bungee;
		margin-left: 2rem;
		font-size: 36px;
		line-height: 37px;
		text-align: center;
		p {
			margin: 0;
			text-decoration: none;
			color: black;
		}
		p:first-child {
			color: #E44857;
		}
		@media (max-width: 768px) {
			margin-left: 0;
			margin-top: 10px;
			font-size: 24px;
			line-height: 28px;
		}
	}
	.sub_header_container {
		display: flex;
		gap: 32px;
		@media (max-width: 768px) {
			flex-direction: column;
			gap: 10px;
		}
	}
</style>