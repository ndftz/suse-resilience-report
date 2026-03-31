document.addEventListener('DOMContentLoaded', function () {
 handleHeaderUltilites()
}
function handleHeaderUltilites() {
	const header = document.querySelector('.header');
	let lastScrollTop = 0;
	const utilityElement = document.querySelector('.header__utility');

	window.addEventListener('scroll', function () {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		if (scrollTop > lastScrollTop && scrollTop > 100) {
			utilityElement?.classList.add('hidden');
			utilityElement?.classList.remove('visible');
			header?.classList.add('scrolled');
		} else if (lastScrollTop > 100) {
			utilityElement?.classList.add('visible');
			utilityElement?.classList.remove('hidden');
			header?.classList.remove('scrolled');
		}

		lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
	});

	const productsLinks = document.querySelectorAll('.header__nav-link .header__nav-link-text');
	const utilityLinks = document.querySelectorAll('.utility__link-wrapper');

	function setAccessibilityAttributes(links) {
		links.forEach((link) => {
			link.setAttribute('tabindex', '0');
			link.setAttribute('role', 'button');
			link.setAttribute('aria-expanded', 'false');
		});
	}

	setAccessibilityAttributes(utilityLinks);
	setAccessibilityAttributes(productsLinks);

	productsLinks.forEach((link) => {
		link?.addEventListener('click', () => toggleNavLink(link, productsLinks));
		link?.addEventListener('keydown', (event) => handleKeyPress(event, link));
	});

	utilityLinks.forEach((link) => {
		link?.addEventListener('keydown', (event) => handleKeyPress(event, link));
	});

	function handleKeyPress(event, element) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			if (element.tagName === 'A' && element.href) {
				window.location.href = element.href;
			} else {
				element.click();
			}
		}
	}

	function toggleNavLink(link, links) {
		const isActive = link.parentNode.classList.contains('active');

		links.forEach((item) => {
			item.parentNode.classList.remove('active');
			item.parentNode.setAttribute('aria-expanded', 'false');
		});
		if (!isActive) {
			link.parentNode.classList.add('active');
			if (link?.innerHTML === 'Support') {
				link.parentNode.classList.add('large-padding');
			}
			link.parentNode.setAttribute('aria-expanded', 'true');
		}
	}
	const linkWrappers = document.querySelectorAll('.utility__link-wrapper');
	const searchWrapper = document.querySelector('.utility__link-wrapper.search');
	const searchboxContainer = document.querySelector('.searchbox-container');
	const utility = document.querySelector('.header__utility');

	linkWrappers.forEach((wrapper) => {
		const link = wrapper.querySelector('.utility__link');
		const dropdown = wrapper.querySelector('.header__dropdown');

		if (dropdown) {
			document?.addEventListener('click', function (event) {
				if (!dropdown?.contains(event.target) && !link?.contains(event.target)) {
					dropdown.classList.remove('open');
				}
			});
			link?.addEventListener('click', function (event) {
				event.preventDefault();

				dropdown.classList.toggle('open');

				linkWrappers.forEach((otherWrapper) => {
					if (otherWrapper !== wrapper) {
						const otherDropdown = otherWrapper.querySelector('.header__dropdown');
						if (otherDropdown) {
							otherDropdown.classList.remove('open');
						}
					}
				});
			});
		}
	});

	document?.addEventListener('click', function (event) {
		const productLink = document.querySelector('.header__nav-link.active');

		let currentElement = event.target;
		const isInsideMegaMenuItemHeading =
			currentElement?.parentNode?.classList?.[0] === 'header__mega-menu-item-heading';

		if (isInsideMegaMenuItemHeading) {
			return;
		}

		if (
			!productLink?.contains(event.target) &&
			!productLink?.querySelector('.header__mega-menu')?.contains(event.target)
		) {
			productLink?.classList.remove('active');
		}

		if (!searchboxContainer) {
			return;
		}

		if (!searchboxContainer?.contains(event.target) && !searchWrapper?.contains(event.target)) {
			searchboxContainer.style.display = 'none';

			linkWrappers.forEach((wrapper) => {
				wrapper.style.removeProperty('display');
			});

			utility.classList.remove('active-search');
		}
	});

	searchWrapper?.addEventListener('click', function (event) {
		if (!utility | !searchboxContainer) {
			return;
		}

		linkWrappers.forEach((wrapper) => {
			wrapper.style.display = 'none';
		});

		utility.classList.add('active-search');
		searchboxContainer.style.display = 'flex';

		event.stopPropagation();
	});

	if (searchboxContainer != null) {
		searchboxContainer?.addEventListener('click', function (event) {
			event.stopPropagation();
		});
	}

	const headerBurgerbtn = document.querySelector('.header__burgerButton');
	const body = document.querySelector('body');

	if (headerBurgerbtn != null) {
		headerBurgerbtn?.addEventListener('click', function () {
			const mobileMenu = document.querySelector('.header__mobile__menu');
			mobileMenu.classList.toggle('active');
			body.classList.toggle('menuopen');
		});
	}

	const headerBackBtn = document.querySelectorAll('.header__back-btn');
	if (headerBackBtn != null) {
		headerBackBtn.forEach((m) => {
			m?.addEventListener('click', function () {
				const megaMenu = document.querySelector('.header__nav-link.active');

				if (megaMenu) {
					megaMenu.classList.remove('active');
				}
			});
		});
	}
}
