const Header = ({ color }: { color: [number, number, number] }) => {
	return (
		<div className="w-full pb-6 pl-10 max-w-screen-xl">
			<div className="relative w-full md:flex opacity-30 transition duration-1000 ease-in-out md:h-20 hover:opacity-100">
				<div
					style={{ maxWidth: '250px' }}
					className="pb-12 pr-10 md:pr-20"
				>
					<a href="/" className="-pt-4">
						<svg width="150" height="22" viewBox="0, 0, 400,50">
							<g id="svgg">
								<path
									id="path0"
									d="M11.985 7.491 C 11.985 8.739,11.486 8.989,8.989 8.989 L 5.993 8.989 5.993 12.360 C 5.993 15.231,5.771 15.730,4.494 15.730 C 3.036 15.730,2.996 16.230,2.996 34.457 L 2.996 53.184 12.734 53.184 L 22.472 53.184 22.472 47.191 L 22.472 41.199 25.094 41.199 C 27.653 41.199,27.715 41.270,27.715 44.195 C 27.715 46.692,27.965 47.191,29.213 47.191 C 30.462 47.191,30.712 47.690,30.712 50.187 L 30.712 53.184 40.449 53.184 L 50.187 53.184 50.187 48.315 C 50.187 43.945,50.034 43.446,48.689 43.446 C 47.690 43.446,47.191 42.946,47.191 41.948 C 47.191 40.949,46.692 40.449,45.693 40.449 C 44.444 40.449,44.195 39.950,44.195 37.453 C 44.195 34.956,44.444 34.457,45.693 34.457 C 46.941 34.457,47.191 33.958,47.191 31.461 C 47.191 28.964,47.441 28.464,48.689 28.464 C 50.034 28.464,50.187 27.965,50.187 23.596 C 50.187 19.226,50.034 18.727,48.689 18.727 C 47.441 18.727,47.191 18.227,47.191 15.730 C 47.191 13.233,46.941 12.734,45.693 12.734 C 44.594 12.734,44.195 12.235,44.195 10.861 C 44.195 9.141,43.920 8.989,40.824 8.989 C 37.953 8.989,37.453 8.767,37.453 7.491 C 37.453 6.051,36.954 5.993,24.719 5.993 C 12.484 5.993,11.985 6.051,11.985 7.491 M72.750 6.837 C 59.815 8.985,52.925 17.017,52.909 29.963 C 52.888 47.397,62.556 53.891,88.577 53.920 L 100.375 53.933 100.375 45.693 L 100.375 37.453 90.262 37.453 C 81.773 37.453,80.150 37.273,80.150 36.330 C 80.150 35.414,81.398 35.206,86.891 35.206 L 93.633 35.206 93.633 29.963 L 93.633 24.719 86.829 24.719 C 75.223 24.719,78.453 22.893,90.511 22.637 L 100.375 22.428 100.375 14.683 L 100.375 6.938 97.566 6.473 C 93.555 5.810,77.514 6.046,72.750 6.837 M252.434 29.963 L 252.434 53.933 276.030 53.933 L 299.625 53.933 299.625 29.963 L 299.625 5.993 276.030 5.993 L 252.434 5.993 252.434 29.963 M112.360 8.240 C 112.360 9.338,111.860 9.738,110.487 9.738 C 108.801 9.738,108.614 10.037,108.614 12.734 L 108.614 15.730 105.618 15.730 L 102.622 15.730 102.622 20.599 C 102.622 24.969,102.775 25.468,104.120 25.468 C 105.396 25.468,105.618 25.968,105.618 28.839 L 105.618 32.210 108.989 32.210 C 111.860 32.210,112.360 32.432,112.360 33.708 C 112.360 35.106,112.859 35.206,119.850 35.206 C 126.009 35.206,127.341 35.406,127.341 36.330 C 127.341 37.283,125.468 37.453,114.981 37.453 L 102.622 37.453 102.622 45.693 L 102.622 53.933 121.723 53.933 C 140.325 53.933,140.824 53.893,140.824 52.434 C 140.824 51.186,141.323 50.936,143.820 50.936 L 146.816 50.936 146.816 47.566 C 146.816 44.694,147.038 44.195,148.315 44.195 C 149.659 44.195,149.813 43.695,149.813 39.326 C 149.813 34.956,149.659 34.457,148.315 34.457 C 147.066 34.457,146.816 33.958,146.816 31.461 L 146.816 28.464 143.820 28.464 C 141.323 28.464,140.824 28.215,140.824 26.966 C 140.824 25.563,140.325 25.468,132.959 25.468 C 125.593 25.468,125.094 25.373,125.094 23.970 C 125.094 22.532,125.593 22.472,137.453 22.472 L 149.813 22.472 149.813 14.607 L 149.813 6.742 131.086 6.742 C 112.859 6.742,112.360 6.782,112.360 8.240 M168.539 8.240 C 168.539 9.516,168.040 9.738,165.169 9.738 C 162.297 9.738,161.798 9.960,161.798 11.236 C 161.798 12.235,161.298 12.734,160.300 12.734 C 159.301 12.734,158.801 13.233,158.801 14.232 C 158.801 15.231,158.302 15.730,157.303 15.730 C 156.055 15.730,155.805 16.230,155.805 18.727 C 155.805 21.223,155.556 21.723,154.307 21.723 C 152.900 21.723,152.809 22.222,152.809 29.963 C 152.809 37.703,152.900 38.202,154.307 38.202 C 155.556 38.202,155.805 38.702,155.805 41.199 C 155.805 43.695,156.055 44.195,157.303 44.195 C 158.302 44.195,158.801 44.694,158.801 45.693 C 158.801 46.692,159.301 47.191,160.300 47.191 C 161.398 47.191,161.798 47.690,161.798 49.064 C 161.798 50.784,162.072 50.936,165.169 50.936 C 168.040 50.936,168.539 51.158,168.539 52.434 C 168.539 53.885,169.039 53.933,184.270 53.933 L 200.000 53.933 200.000 45.693 L 200.000 37.453 187.640 37.453 C 177.154 37.453,175.281 37.283,175.281 36.330 C 175.281 35.391,176.821 35.206,184.644 35.206 L 194.007 35.206 194.007 30.337 L 194.007 25.468 184.644 25.468 C 175.780 25.468,175.281 25.388,175.281 23.970 C 175.281 22.532,175.780 22.472,187.640 22.472 L 200.000 22.472 200.000 14.607 L 200.000 6.742 184.270 6.742 C 169.039 6.742,168.539 6.789,168.539 8.240 M202.247 14.607 L 202.247 22.472 204.120 22.472 C 205.805 22.472,205.993 22.772,205.993 25.468 C 205.993 27.965,206.242 28.464,207.491 28.464 C 208.767 28.464,208.989 28.964,208.989 31.835 C 208.989 34.707,209.211 35.206,210.487 35.206 C 211.735 35.206,211.985 35.705,211.985 38.202 C 211.985 40.699,212.235 41.199,213.483 41.199 C 214.732 41.199,214.981 41.698,214.981 44.195 C 214.981 46.692,215.231 47.191,216.479 47.191 C 217.578 47.191,217.978 47.690,217.978 49.064 C 217.978 50.437,218.377 50.936,219.476 50.936 C 220.474 50.936,220.974 51.436,220.974 52.434 C 220.974 53.790,221.473 53.933,226.217 53.933 C 230.961 53.933,231.461 53.790,231.461 52.434 C 231.461 51.436,231.960 50.936,232.959 50.936 C 234.057 50.936,234.457 50.437,234.457 49.064 C 234.457 47.690,234.856 47.191,235.955 47.191 C 237.203 47.191,237.453 46.692,237.453 44.195 C 237.453 41.698,237.703 41.199,238.951 41.199 C 240.200 41.199,240.449 40.699,240.449 38.202 C 240.449 35.705,240.699 35.206,241.948 35.206 C 243.224 35.206,243.446 34.707,243.446 31.835 C 243.446 28.964,243.668 28.464,244.944 28.464 C 246.192 28.464,246.442 27.965,246.442 25.468 C 246.442 22.772,246.629 22.472,248.315 22.472 L 250.187 22.472 250.187 14.607 L 250.187 6.742 243.446 6.742 L 236.704 6.742 236.704 9.738 C 236.704 12.235,236.454 12.734,235.206 12.734 C 233.958 12.734,233.708 13.233,233.708 15.730 C 233.708 18.227,233.458 18.727,232.210 18.727 C 230.934 18.727,230.712 19.226,230.712 22.097 L 230.712 25.468 227.715 25.468 L 224.719 25.468 224.719 22.097 C 224.719 19.226,224.497 18.727,223.221 18.727 C 221.973 18.727,221.723 18.227,221.723 15.730 C 221.723 13.233,221.473 12.734,220.225 12.734 C 218.976 12.734,218.727 12.235,218.727 9.738 L 218.727 6.742 210.487 6.742 L 202.247 6.742 202.247 14.607 M302.622 14.607 L 302.622 22.472 308.614 22.472 C 314.107 22.472,314.607 22.597,314.607 23.970 C 314.607 24.969,315.106 25.468,316.105 25.468 C 317.104 25.468,317.603 25.968,317.603 26.966 C 317.603 28.065,318.102 28.464,319.476 28.464 C 321.326 28.464,321.348 28.539,321.348 34.831 C 321.348 40.699,321.466 41.199,322.846 41.199 C 324.095 41.199,324.345 41.698,324.345 44.195 C 324.345 46.692,324.594 47.191,325.843 47.191 C 327.119 47.191,327.341 47.690,327.341 50.562 L 327.341 53.933 338.577 53.933 L 349.813 53.933 349.813 45.693 L 349.813 37.453 343.446 37.453 C 337.578 37.453,337.079 37.336,337.079 35.955 C 337.079 34.956,336.579 34.457,335.581 34.457 C 334.582 34.457,334.082 33.958,334.082 32.959 C 334.082 31.960,333.583 31.461,332.584 31.461 C 331.204 31.461,331.086 30.961,331.086 25.094 C 331.086 19.226,330.969 18.727,329.588 18.727 C 328.340 18.727,328.090 18.227,328.090 15.730 C 328.090 13.034,327.903 12.734,326.217 12.734 C 324.532 12.734,324.345 12.434,324.345 9.738 L 324.345 6.742 313.483 6.742 L 302.622 6.742 302.622 14.607 M361.798 8.240 C 361.798 9.516,361.298 9.738,358.427 9.738 L 355.056 9.738 355.056 12.734 C 355.056 15.231,354.806 15.730,353.558 15.730 C 352.099 15.730,352.060 16.230,352.060 34.831 L 352.060 53.933 361.798 53.933 L 371.536 53.933 371.536 47.566 L 371.536 41.199 374.532 41.199 L 377.528 41.199 377.528 44.195 C 377.528 46.692,377.778 47.191,379.026 47.191 C 380.302 47.191,380.524 47.690,380.524 50.562 L 380.524 53.933 389.888 53.933 L 399.251 53.933 399.251 49.064 C 399.251 44.694,399.097 44.195,397.753 44.195 C 396.654 44.195,396.255 43.695,396.255 42.322 C 396.255 40.949,395.855 40.449,394.757 40.449 C 393.544 40.449,393.258 39.950,393.258 37.828 C 393.258 35.705,393.544 35.206,394.757 35.206 C 396.033 35.206,396.255 34.707,396.255 31.835 C 396.255 28.964,396.477 28.464,397.753 28.464 C 399.097 28.464,399.251 27.965,399.251 23.596 C 399.251 19.226,399.097 18.727,397.753 18.727 C 396.504 18.727,396.255 18.227,396.255 15.730 C 396.255 13.233,396.005 12.734,394.757 12.734 C 393.758 12.734,393.258 12.235,393.258 11.236 C 393.258 9.988,392.759 9.738,390.262 9.738 C 387.765 9.738,387.266 9.488,387.266 8.240 C 387.266 6.800,386.767 6.742,374.532 6.742 C 362.297 6.742,361.798 6.800,361.798 8.240 M30.712 23.596 C 30.712 24.458,29.754 24.719,26.592 24.719 C 23.429 24.719,22.472 24.458,22.472 23.596 C 22.472 22.733,23.429 22.472,26.592 22.472 C 29.754 22.472,30.712 22.733,30.712 23.596 M380.524 23.970 C 380.524 25.302,380.025 25.468,376.030 25.468 C 372.035 25.468,371.536 25.302,371.536 23.970 C 371.536 22.638,372.035 22.472,376.030 22.472 C 380.025 22.472,380.524 22.638,380.524 23.970 "
									stroke="none"
									fill={`rgb(${color[0]},${color[1]},${color[2]})`}
									fillRule="evenodd"
								></path>
							</g>
						</svg>
					</a>
				</div>
				<div
					style={{
						color: `rgb(${color[0]},${color[1]},${color[2]})`,
					}}
					className="w-full md:grid md:grid-cols-4"
				>
					<span className="w-full font-sans group">
						<span className="my-3">
							<a href="/motion">Motion</a>
							<span className="z-50 opacity-0 transition-opacity duration-200 ease-in-out lg:group-hover:opacity-100">
								://
							</span>
						</span>
						<div className="z-50 opacity-0 transition-opacity duration-200 ease-in-out lg:group-hover:opacity-100">
							{' '}
							<a href="/sailing">sailing</a>,{' '}
							<a href="/biking">biking</a>,{' '}
							<a href="/library">library</a>
						</div>
						<div className="z-50 opacity-0 transition-opacity duration-200 ease-in-out lg:group-hover:opacity-100">
							{' '}
							<a href="/time-based">time-based</a>,{' '}
							<a href="/manifestations">manifestations</a>{' '}
						</div>
					</span>
					<span className=" font-sans group">
						<span className="my-3">
							<a href="/stillness">Stillness</a>
							<span className="z-50 opacity-0 transition-opacity duration-200 ease-in-out lg:group-hover:opacity-100">
								://
							</span>
						</span>
						<div className="z-50 opacity-0 transition-opacity duration-200 ease-in-out lg:group-hover:opacity-100">
							{' '}
							<a href="/settlement">settlement</a>
						</div>
						<div className="z-50 opacity-0 transition-opacity duration-200 ease-in-out lg:group-hover:opacity-100">
							<a href="/photos">photos</a>
						</div>
					</span>
					<span className=" font-sans group">
						<span className="my-3">
							<a href="/language">Language</a>
							<span className="z-50 opacity-0 transition-opacity duration-200 ease-in-out lg:group-hover:opacity-100">
								://
							</span>
						</span>
						<div className="z-50 opacity-0 transition-opacity duration-200 ease-in-out lg:group-hover:opacity-100">
							{' '}
							<a href="/dansk">dansk</a>,{' '}
							<a href="/english">english</a>{' '}
						</div>
						<div className="z-50 opacity-0 transition-opacity duration-200 ease-in-out lg:group-hover:opacity-100">
							{' '}
							<a href="/essays">essays</a>,{' '}
							<a href="/quotes">quotes</a>
						</div>
					</span>
					<span className=" font-sans group">
						<span className="my-3">
							<a href="/meta">Meta</a>
							<span className="z-50 opacity-0 transition-opacity duration-200 ease-in-out lg:group-hover:opacity-100">
								://
							</span>
						</span>
						<div className="z-50 opacity-0 transition-opacity duration-200 ease-in-out lg:group-hover:opacity-100">
							{' '}
							<a href="/about">about</a>,{' '}
							<a href="/resevoir">resevoir</a>
						</div>
						<div className="z-50 opacity-0 transition-opacity duration-200 ease-in-out lg:group-hover:opacity-100">
							{' '}
							<a href="/now">now</a>,{' '}
							<a href="/resevoir-index">index</a>,{' '}
							<a href="/rss.xml">rss</a>
						</div>
					</span>
				</div>
			</div>
		</div>
	)
}

export default Header
