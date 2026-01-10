import { createFileRoute } from "@tanstack/react-router";
import { getPosts } from "@/lib/query";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: HomePage,
	loader: async () => {
		const data = await getPosts();
		return data;
	},
});

function HomePage() {
	const data = Route.useLoaderData();

	if (!data || !data.posts)
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-4xl font-bold mb-8">TanStack Start × Marble</h1>
					<p className="text-gray-600">No posts found</p>
				</div>
			</div>
		);

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="container mx-auto px-4 py-12">
				<h1 className="text-5xl font-bold text-center mb-16 text-gray-900">
					TanStack Start × Marble
				</h1>

				<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
					{data.posts.map((post) => (
						<Link
							key={post.id}
							to="/posts/$slug"
							params={{ slug: post.slug }}
							className="group flex flex-col overflow-hidden"
						>
							<div className="aspect-video bg-gray-200 overflow-hidden">
								<img
									src={post.coverImage || ""}
									alt={post.title}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
								/>
							</div>
							<div className="p-6 flex flex-col flex-grow">
								<div className="flex-grow">
									<h2 className="text-xl font-semibold text-gray-900 transition-colors duration-200 line-clamp-2">
										{post.title}
									</h2>
									<p className="text-gray-600 mt-2 text-sm line-clamp-3">
										{post.description}
									</p>
								</div>
								<div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
									<time dateTime={new Date(post.publishedAt).toISOString()}>
										{new Date(post.publishedAt).toLocaleDateString("en-US", {
											year: "numeric",
											month: "long",
											day: "numeric",
										})}
									</time>
									{post.category && (
										<span className="text-grey-500 px-2 py-1 rounded-full text-xs font-medium">
											{post.category.name}
										</span>
									)}
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
