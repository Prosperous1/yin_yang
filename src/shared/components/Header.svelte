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
        <NavButton link="account" color="black" title="Профиль" icon="/icons/ui/account.svg"/>
        <NavButton link="favourite" color="black" title="Избранное" icon="/icons/ui/love.svg"/>
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
    }

	.sub_header_container {
		display: flex;
		gap: 32px;
	}
</style>