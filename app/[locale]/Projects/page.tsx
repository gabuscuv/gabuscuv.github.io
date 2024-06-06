import ProjectBrowser from "./components/ProjectBrowser";

//function to generate the routes for all the locales
export async function generateStaticParams() {
    return ['en', 'es'].map((locale) => ({ locale }))
  }

export default function Project()
{
    return <ProjectBrowser />
}