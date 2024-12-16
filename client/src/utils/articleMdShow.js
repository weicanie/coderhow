
export default function articleMdShow(title, content, isHome = false, summary) {//是否是首页的概览
  summary = summary ? `## AI总结:\n${summary}` : ''
  if (isHome) {
    content = content.replace(/^#+\s+/, '');
    title = title.replace(/^#+\s+/, '');
    return `**${title}**\n${content}\n${summary}`
  }
  title = title.replace(/^#+\s+/, '');
  return `# ${title}\n${content}\n\n\n\n${summary}`;
}