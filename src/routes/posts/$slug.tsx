import { createFileRoute } from "@tanstack/react-router";
import { getSinglePost } from "@/lib/query";
import { Prose } from "@/components/Prose";

export const Route = createFileRoute("/posts/$slug")({
	component: PostPage,
	loader: async ({ params }: { params: { slug: string } }) => {
		const data = await getSinglePost({ data: params.slug });
		return data;
	},
});

function PostPage() {
	const data = Route.useLoaderData();

	if (!data || !data.post)
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-bold text-gray-900">Post not found</h1>
					<p className="text-gray-600 mt-2">
						The post you're looking for doesn't exist.
					</p>
				</div>
			</div>
		);

	const { post } = data;

	return (
		<div className="min-h-screen bg-gray-50">
			<article className="max-w-4xl mx-auto px-4 py-8">
				<header className="mb-8">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight text-center">
						{post.title}
					</h1>

					{post.coverImage && (
						<div className="aspect-video md:aspect-[2/1] bg-gray-200 rounded-lg overflow-hidden mb-6">
							<img
								src={post.coverImage}
								alt={post.title}
								className="w-full h-full object-cover"
							/>
						</div>
					)}

					<div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 mb-8">
						<time dateTime={new Date(post.publishedAt).toISOString()}>
							{new Date(post.publishedAt).toLocaleDateString("en-US", {
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</time>

						{post.authors && post.authors.length > 0 && (
							<>
								<span>•</span>
								<div className="flex items-center gap-2">
									{post.authors.map((author, index) => (
										<span key={author.id} className="flex items-center gap-1">
											{author.image && (
												<img
													src={author.image}
													alt={author.name}
													className="w-5 h-5 rounded-full"
												/>
											)}
											<span>{author.name}</span>
											{index < post.authors.length - 1 && (
												<span className="text-gray-400">,</span>
											)}
										</span>
									))}
								</div>
							</>
						)}
					</div>
				</header>

				<div className="p-8 md:p-12">
					<Prose html={post.content} />
				</div>

				{post.tags && post.tags.length > 0 && (
					<div className="mt-8 pt-8 border-t border-gray-200">
						<div className="flex flex-wrap gap-2">
							{post.tags.map((tag) => (
								<span
									key={tag.id}
									className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors"
								>
									#{tag.name}
								</span>
							))}
						</div>
					</div>
				)}
			</article>
		</div>
	);
}
